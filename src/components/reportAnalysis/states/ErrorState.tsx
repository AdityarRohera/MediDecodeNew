export default function ErrorState({
  title,
}: {
  title: string;
}) {

  return (
    <div className="flex min-h-[500px] items-center justify-center">

      <div className="text-center">

        <h1 className="text-2xl font-bold text-red-500">
          Error
        </h1>

        <p className="mt-2">
          {title}
        </p>

      </div>

    </div>
  );
}