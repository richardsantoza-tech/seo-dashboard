import { VALUE_PROPS } from "@/lib/constants";
import Card from "@/components/ui/Card";

export default function ValueProps() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <div className="grid gap-8 md:grid-cols-3">
        {VALUE_PROPS.map((prop) => (
          <Card key={prop.headline} className="text-center">
            <h3 className="text-lg font-semibold text-gray-900">
              {prop.headline}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              {prop.description}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}
