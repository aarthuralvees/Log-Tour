import Image from 'next/image';

export function CartaoDeApresentacao({
  title,
  description,
  iconUrl,
  iconPosition = 'left',
}) {
  
  const flexDirectionClass =
    iconPosition === 'right' ? 'flex-row-reverse' : 'flex-row';

  return (
    <div
      className={`
        flex w-full max-w-lg items-center gap-x-6 rounded-2xl border-2 
        border-sky-300 bg-white p-6 shadow-md
        ${flexDirectionClass}
      `}
    >
      <div className="relative h-32 w-32 flex-shrink-0">
        <Image
          src={iconUrl}
          alt={`Ilustração para ${title}`}
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div className="text-left">
        <h3 className="mb-2 text-lg font-bold text-sky-600">
          {title}
        </h3>
        <p className="text-sm font-normal text-gray-600">
          {description}
        </p>
      </div>
    </div>
  );
}