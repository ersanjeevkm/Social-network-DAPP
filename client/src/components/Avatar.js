import DefaultAvatar from "../icons/avatar.svg";

export default ({ size = 32 }) => {
  return (
    <div className="avatar">
      <img src={DefaultAvatar} alt="img" />

      <style jsx>{`
        .avatar {
          display: inline-block;
          vertical-align: middle;
          width: ${size}px;
          height: ${size}px;
        }
        .avatar :global(svg) {
          width: 100%;
          height: 100%;
        }
        .avatar img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
};
