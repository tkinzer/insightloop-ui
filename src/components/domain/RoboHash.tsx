export default function RoboHash() {
  const roboHashClasses = `flex flex-col items-center justify-center h-screen`;
  const roboHashString = new Date();
  const roboHashImage = `https://robohash.org/${roboHashString}`;

  return (
    <div>
      <img src={roboHashImage} alt="robo image" />
    </div>
  );
}
