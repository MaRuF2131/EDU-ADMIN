import Link from "next/link";
import { integrationMenu } from "../_components/integrationData";

export default function ApiFeaturesPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-slate-500">
          Admin / API & Integration / Features
        </p>
        <h1 className="mt-1 text-2xl font-bold text-slate-800">
          API Features
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Explore and manage all available API and integration services.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {integrationMenu.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-blue-300 hover:shadow-md"
          >
            <span className="text-3xl">{item.icon}</span>
            <h2 className="mt-4 font-semibold text-slate-800">
              {item.title}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Configure and monitor {item.title.toLowerCase()} services.
            </p>
            <p className="mt-4 text-sm font-medium text-blue-600">
              Manage Integration →
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}