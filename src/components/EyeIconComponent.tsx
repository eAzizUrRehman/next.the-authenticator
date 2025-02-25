import Image from 'next/image';

interface EyeIconComponentProps {
  isVisible: boolean;
  toggleVisibility: () => void;
}

const EyeIconComponent: React.FC<EyeIconComponentProps> = ({
  isVisible,
  toggleVisibility,
}) => {
  return (
    <button
      type="button"
      className="absolute right-2 top-[42px] -translate-y-1/2 transform"
      onClick={toggleVisibility}
    >
      <Image
        width={20}
        height={20}
        src={isVisible ? '/icons/eye-off-icon.svg' : '/icons/eye-on-icon.svg'}
        alt="eye icon"
        className="opacity-50 dark:invert"
      />
    </button>
  );
};

export default EyeIconComponent;
