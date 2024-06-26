import { client } from "@/trigger";
import { eventTrigger } from "@trigger.dev/sdk";
import neo4j from "neo4j-driver";

const neo4jUri = process.env.NEO4J_URI as string;
const neo4jUser = process.env.NEO4J_USER as string;
const neo4jPassword = process.env.NEO4J_PASSWORD as string;

client.defineJob({
  id: "embed-candidate-graph",
  name: "Embed Candidate to GraphDB",
  version: "0.0.1",
  trigger: eventTrigger({
    name: "embed-candidate-graph.event",
  }),
  run: async (payload: { orgId: string; userId: string }, io, ctx) => {
    const candidateExists = await io.runTask(
      "check-candidate-exists",
      async () => {
        const driver = neo4j.driver(
          neo4jUri,
          neo4j.auth.basic(neo4jUser, neo4jPassword)
        );
        const session = driver.session();

        try {
          if (!payload.orgId || !payload.userId) {
            throw new Error("orgId and userId are required in the payload");
          }

          const result = await session.run(
            `
            MATCH (c:PERSON {orgId: $orgId, userId: $userId})
            RETURN COUNT(c) > 0 AS exists
            `,
            { orgId: payload.orgId, userId: payload.userId }
          );

          const exists = result.records[0].get("exists");

          return exists;
        } catch (error) {
          console.error("Error checking candidate existence:", error);
          throw error;
        } finally {
          await session.close();
          await driver.close();
        }
      }
    );

    await io.logger.info(`Candidate exists: ${candidateExists}`);

    return { candidateExists };
  },
});
