export function PageHeading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <>
      <h1 className="page">{title}</h1>
      <p className="sub">{description}</p>
    </>
  );
}
