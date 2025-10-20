import React from "react";

export function CartaoDeApresentacao({
  title,
  description,
  iconUrl,
  iconPosition = 'left',
  className,
  layout,
}) {
  const flexDirectionClass =
    iconPosition === 'right' ? 'flex-row-reverse' : 'flex-row';

if (layout === 'horizontal') {
  return (
    <div
      className={`
        flex w-full items-center gap-x-6 rounded-2xl border-2 
        border-blue-200 bg-white p-5 shadow-md
        ${flexDirectionClass}
        ${className ?? ''} 
      `}
    >
      <div className="relative w-1/3 aspect-square flex-shrink-0">
        <img
          src={iconUrl}
          alt={`Ilustração para ${title}`}
          className="absolute inset-0 h-full w-full object-contain"
        />
      </div>
      <div className="text-left">
        <h3 className="mb-2 text-xl font-bold text-borrow md:text-2xl lg:text-3xl text-center pb-2">{title}</h3>
        <p className="text-base font-normal text-gray-600 md:text-lg lg:text-2xl text-center">{description}</p>
      </div>
    </div>
  );
} else {
  return (
<div
      className={`
          flex flex-col aspect-square  justify-center items-center p-6 bg-white rounded-2xl border-2 
          border-blue-200 shadow-md
          ${className ?? ''} 
        `}
      >
        <div className="flex items-center gap-x-4 mb-4 w-auto p-1">
          <div className="relative w-11/12  aspect-square mb-2">
            <img
              src={iconUrl}
              alt={`Ilustração para ${title}`}
              className="absolute inset-0 h-full w-full object-contain"
            />
          </div>
          <h3 className="font-bold text-borrow text-xl sm:text-2xl md:text-3xl mb-2">{title}</h3>
        </div>

        <p className="font-normal text-gray-600 text-base sm:text-lg md:text-2xl">
          {description}
        </p>
      </div>
    );
  }
}
