import { useRouter } from "next/navigation"
import { NextResponse } from "next/server"
import { useState } from "react"
import { useFormState } from "react-dom"

export default function Register() {
    const [email,setEmail] = useState<string>("")
    const [password , setPassword] = useState<string>("")
    const [confirmPassword, setConfirmaapassword] = useState<string>("")
    const [error,setError]= useState<string| null>(null)

     const router = useRouter()
     const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        if (password!==confirmPassword){
            setError("Your password does not match")
        }
        try {
           const res =  await fetch("/api/auth/register",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body : JSON.stringify({email,password})
           })
           
           const data = res.json()
           if(!res.ok){
            setError("Registration failed ")
           }
           router.push("/login")
        } catch (error) {
            return NextResponse.json(
                {error:"failed to register"},
                {status:204}
            )
        }
     }

  return (
    <div>
       
    </div>
  )
}
