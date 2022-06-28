type Props = {};

export const SignOutButton = (props: Props) => {
  const handleClick = () => {
    console.debug('sign out button clicked');
  };

  return (
    <button onClick={handleClick} type="button" className="btn normal-case">
      Sign Out
    </button>
  );
};
