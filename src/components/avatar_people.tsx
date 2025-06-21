export default function AvatarPeople() {
  return (
    <div className="bg-background flex items-center rounded-full border p-1 shadow-sm">
      <div className="flex -space-x-1.5">
        <img
          className="ring-background rounded-full ring-1"
          src="/images/gal-1.jpg"
          width={20}
          height={20}
          alt="Avatar 01"
        />
        <img
          className="ring-background rounded-full ring-1"
          src="/images/port-1.jpg"
          width={20}
          height={20}
          alt="Avatar 02"
        />
        <img
          className="ring-background rounded-full ring-1"
          src="/images/port-2.jpg"
          width={20}
          height={20}
          alt="Avatar 03"
        />
        <img
          className="ring-background rounded-full ring-1"
          src="/images/port-3.jpg"
          width={20}
          height={20}
          alt="Avatar 04"
        />
      </div>
      <p className="text-muted-foreground px-2 text-xs">
        Trusted by <strong className="text-foreground font-medium">60K+</strong>{" "}
        developers.
      </p>
    </div>
  );
}
