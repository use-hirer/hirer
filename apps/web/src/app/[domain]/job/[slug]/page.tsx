export default async function JobPublicPage({
  params,
}: {
  params: { domain: string; slug: string };
}) {
  console.log(params);

  return <div>hello</div>;
}
