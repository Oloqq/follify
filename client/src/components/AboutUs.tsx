function AboutUs() {
  return (
    <section className="mb-12">
      <div className="flex flex-col items-center mb-24">
        <div className="w-12 h-12 bg-green-500" />
        <h1 className="text-3xl">FOLLIFY</h1>
        <p className="text-green-500 text-sm">FOLLOW YOUR MUSIC</p>
      </div>
      <div className="flex flex-col items-center">
        <h1 className="text-5xl">ABOUT US</h1>
        <p className="text-lg text-center">
          Jesteśmy studentami AGH i chcemy sprawić, aby twoje wrażenia z używania Spotify były jeszcze lepsze!
        </p>
      </div>
      <div className="grid mt-24 md:grid-cols-2 gap-12 lg:grid-cols-4">
        <MemberCard name="Olgierd" role="Back-end & Management" />
        <MemberCard name="Kuba" role="Testing & Workflow" />
        <MemberCard name="Jan" role="Front-end" />
        <MemberCard name="Marcin" role="Front-end" />
      </div>
    </section>
  );
}

function MemberCard({
  name,
  role,
}: {
  name: string;
  role: string;
  imageSrc?: string;
}) {
  return (
    <div className="flex flex-col items-center">
      <p className="text-2xl">{name}</p>
      <div className="w-48 h-48 rounded-full my-6 bg-green-500" />
      <p className="text-2xl font-medium">{role}</p>
    </div>
  );
}

export default AboutUs;
