import Input from "../components/UI/Input";
import styles from "./Signup.module.css";

const Signup = () => {
  return (
    <div className={`${styles.background} h-screen relative`}>
      <div className="absolute inset-y-20 inset-x-16 mx-auto  max-w-xl shadow-gray-800 shadow-md rounded-xl bg-green-100">
        <form className="absolute inset-x-10 top-10 bottom-5 overflow-clip">
          <div className="flex">
            <Input id="fName" label="First name" type="text" />
            <Input id="lName" label="Last name" type="text" />
          </div>
          <Input id="email" label="Email" type="email" />
          <Input id="password" label="Password" type="password" />
          <Input
            id="confirmPassword"
            label="Confirm password"
            type="password"
          />
          <span className="block mx-6">
            By signing up you agree to our{" "}
            <a
              href="/signup"
              className="text-blue-900 underline underline-offset-2"
            >
              Privacy Policy
            </a>
          </span>
          <div className="w-auto h-[11rem] flex items-center justify-center">
            <button
              type="submit"
              className="bg-green-800 text-white uppercase w-80 h-16 mx-5 text-3xl rounded-full"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
