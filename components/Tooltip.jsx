const positions = {
  top: 'bottom-full',
  bottom: 'top-full',
};

function Tooltip({
  textClassname,
  className,
  iconClassName,
  position,
  title,
  content,
}) {
  return (
    <div className={`${textClassname} group relative overflow-visible`}>
      {title}
      <div
        className={`${positions[position]} ${className} pointer-events-none absolute left-1/2 z-10 -translate-y-2 -translate-x-1/2 transform rounded-lg py-2 px-3 text-center text-xs text-white opacity-0 group-hover:opacity-100`}
      >
        {content}
        <svg
          className={`${iconClassName} absolute left-0 top-full h-2 w-full`}
          x="0px"
          y="0px"
          viewBox="0 0 255 255"
          xmlSpace="preserve"
        >
          <polygon fill="#402C06" points="0,0 127.5,127.5 255,0" />
        </svg>
      </div>
    </div>
  );
}

export default Tooltip;
