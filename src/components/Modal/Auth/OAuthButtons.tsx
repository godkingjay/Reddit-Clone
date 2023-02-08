import Image from "next/image";

type OAuthProps = {};

const OAuthButtons: React.FC<OAuthProps> = () => {
  return (
    <section className="w-full flex flex-col py-1">
      <button type="button" title="Continue with Google" className="o-auth-buttons">
        <Image
          src={"/images/googlelogo.png"}
          height={128}
          width={128}
          className="o-auth-button-img"
          alt="Google Logo"
        />
        <label className="o-auth-button-label">Continue with Google</label>
      </button>
    </section>
  );
};

export default OAuthButtons;