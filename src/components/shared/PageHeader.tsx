type PageHeaderProps = {
  title: string;
  description: string;
};

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
          {title}
        </h1>
        <p className="text-muted-foreground text-lg">{description}</p>
      </div>
    </div>
  );
}
