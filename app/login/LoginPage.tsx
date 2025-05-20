"use client";
import {useState} from "react";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // const router = useRouter();

    // const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //   setUsername(event.target.value);
    // };

    // const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //   setPassword(event.target.value);
    // };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({username, password}),
            });
            const res = await response.json();
            if (!response.ok) {
                if (response.status === 400) {
                    // res.message.data.map((res: { message: string }) => alert(res.message));
                    // res.message.data.map((res: { message: string }) => error.push(res.message));
                    // alert(error)
                    const man: string = res.message.data.map((res: { message: string }) => res.message);
                    console.log(man);
                    // Router.push("/");
                }
            }
        } catch (e) {
            console.log(e);
        }

        // if (res) {
        //   console.log(response);
        // } else {
        //   console.error(response);
        // }
    };
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Sign In
                    </button>
                </div>
            </form>
        </div>
    );
}

export default LoginPage;
