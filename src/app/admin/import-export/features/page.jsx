
import Link from "next/link";
import { importExportMenu } from "../_components/importExportData";

export default function ImportExportFeaturesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Import / Export Features
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Choose an operation to manage institutional records in bulk.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {importExportMenu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-blue-300 hover:shadow-md"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-2xl">
              {item.icon}
            </div>
            <h2 className="font-semibold text-slate-800">
              {item.title}
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              {item.description}
            </p>
            <p className="mt-4 text-sm font-medium text-blue-600">
              Manage Operation →
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
