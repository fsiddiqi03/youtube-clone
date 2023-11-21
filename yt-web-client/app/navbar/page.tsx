"use client";

import Image from "@/node_modules/next/image";
import styles from "./navbar.module.css";
import Link from "@/node_modules/next/link";
import SignIn from "./sign-in";
import { onAuthStateChangedHelper } from "../firebase/firebase";
import { useState, useEffect} from "react";
import { User } from "firebase/auth";




export default function Navbar() {
    // Initial user state
    const [user, setUser] = useState<User | null>(null);


    useEffect(() => {
        const unsubscribe = onAuthStateChangedHelper((user) => {
            setUser(user);
        });

        return () => unsubscribe();
    });


    return (
        <nav className={styles.nav}>
            <Link href="/">
                <Image  width={90} height={20}
                    src="/youtube-logo.svg" alt = "Youtube Logo"/>
            </Link>
            {

            }
            <SignIn user={user}/>
        </nav>
    );
}