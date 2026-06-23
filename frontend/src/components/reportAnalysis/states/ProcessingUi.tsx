

export default function ProcessingState() {

  return (
    <div className="flex min-h-[500px] items-center justify-center">

      <div className="text-center">

        <div className="h-10 w-10 animate-spin rounded-full border-4 border-green-500 border-t-transparent mx-auto" />

        <h1 className="mt-4 text-2xl font-bold">
          Analyzing Report
        </h1>

        <p className="mt-2">
          Please wait...
        </p>

      </div>

    </div>
  );
}