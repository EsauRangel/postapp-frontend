import React, { useState } from 'react'
import { PostForm } from '../components/PostForm'
import { PostTable } from '../components/PostTable'
import { Spiner } from '../components/personalComponents/Spiner'

export const PostScreen = () => {

    return (
        <>
            <PostForm />
            <PostTable />
            <Spiner />
        </>
    )
}
