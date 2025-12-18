interface IStudyCardDetailsProps {
  id: string;
  title: string;
  description: string;
  author: string;
  tag: string;
  //   slug: string;
  createdAt?: string;
}

// mapa de cores
const tagColors: Record<string, { border: string; text: string; bg: string }> =
  {
    Salvação: {
      border: "border border-red-700",
      text: "text-red-800",
      bg: "bg-red-100",
    },
    "Espírito Santo": {
      border: "border border-yellow-700",
      text: "text-yellow-800",
      bg: "bg-yellow-100",
    },
    Cura: {
      border: "border border-blue-700",
      text: "text-blue-800",
      bg: "bg-blue-100",
    },
    Apocalipse: {
      border: "border border-purple-700",
      text: "text-purple-800",
      bg: "bg-purple-100",
    },
    Família: {
      border: "border border-green-700",
      text: "text-green-800",
      bg: "bg-green-100",
    },
  };

function formatDate(dateString?: string): string {
  if (!dateString) return "";

  const date = new Date(dateString);
  const today = new Date();

  const day = date.getDate();
  const month = date.toLocaleString("pt-BR", { month: "long" });
  const year = date.getFullYear();

  const currentYear = today.getFullYear();

  // se for do ano atual, não mostra o ano
  return `${day} de ${month}${year !== currentYear ? ` de ${year}` : ""}`;
}

export const StudyCardDetails = ({
  title,
  description,
  author,
  createdAt,
  tag,
}: IStudyCardDetailsProps) => {
  const styles = tagColors[tag] || {
    border: "border border-gray-400",
    text: "text-gray-600",
    bg: "bg-gray-50",
  };
  return (
    <section className="h-63 p-4 flex flex-col justify-between bg-[#fafafa]">
      <div className="flex flex-col lg:gap-2 gap-1">
        <h1 className="capitalize font-title sm:text-xl text-lg line-clamp-2">{title}</h1>
        <p className="font-body line-clamp-4 text-justify text-balance">{description}</p>
      </div>
      <>
        <hr />
        <div className="flex justify-between mt-1.5">
          <p
            className={`font-body-medium text-sm py-1 px-2 h-fit rounded-sm ${styles.border} ${styles.text} ${styles.bg}`}
          >
            {tag}
          </p>
          <div className="flex flex-col gap-2">
            <h3 className="font-title text-base self-end">{author}</h3>
            <p className="self-end font-body -mt-1">{formatDate(createdAt)}</p>
          </div>
        </div>
      </>
    </section>
  );
};
