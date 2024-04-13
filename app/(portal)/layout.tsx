"use client"
import { useRouter } from "next/navigation"
import { UserAuth } from "../context/AuthContext"
import { useEffect, useState } from 'react'
import Navbar from "../components/Navbar"
import React from 'react';

export default function HomescreenLayout({
    children
}: {
    children: React.ReactNode
}) {
    const router = useRouter()
    const { user, loading } = UserAuth();

    useEffect(() => {
        if (user == null && !loading) {
            router.push('/signin')
        }
    })

    return user == null ? null : (
        <div className="flex h-full">
            <Navbar />
        </div>
    )
}