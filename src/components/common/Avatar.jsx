// I created this Avatar component to display the user's profile image.
const Avatar = ({ src, size }) => {
  // I created these size options so I can easily control the avatar size wherever I use it.
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  };

  return (
    <img
      src={src}
      alt="User avatar"
      // I used Tailwind classes to make the image circular and keep the avatar image properly fitted.
      className={`rounded-full object-cover ${sizeClasses[size]}`}
    />
  );
};

export default Avatar;