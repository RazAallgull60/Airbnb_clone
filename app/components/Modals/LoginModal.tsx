/* eslint-disable react/no-unescaped-entities */
'use client';

import React from 'react';
import axios from 'axios';
import { signIn } from 'next-auth/react'
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';

import Modal from './Modal';
import Heading from '../Heading';
import Input from '../Inputs/Input';
import { toast } from 'react-hot-toast';
import Button from '../Button';
import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from 'next/navigation';

const LoginModal = () => {
    const router = useRouter();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register, 
        handleSubmit, 
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        signIn('credentials', {
            ...data,
            redirect: false
        })
        .then((callback) => {
            setIsLoading(false);

            if (callback?.ok) {
                toast.success('Connection réussie');
                router.refresh();
                loginModal.onClose();
            }

            if (callback?.error) {
                toast.error(callback.error);
            }
        })
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading 
                title="Vous êtes de retour sur Airbnb"
                subtitle="Connectez vous à votre compte !"            
            />
            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="password"
                type="password"
                label="Mot de passe"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    );

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button
              outline
              label="Continuer avec Google"
              icon={FcGoogle}
              onClick={() => {}}
            />
            <Button
              outline
              label="Continuer avec Github"
              icon={AiFillGithub}
              onClick={() => {}}
            />
            <div
              className="
                text-neutral-500
                text-center
                mt-4
                font-light"
            >
                <div className="justify-center flex flex-row items-center gap-2">
                    <div>
                        Vous avez déjà un compte ?
                    </div>
                    <div
                      onClick={loginModal.onClose} 
                      className="text-neutral-800
                      cursor-pointer
                      hover:underline"
                    >
                        S'identifier
                    </div>
                </div>
            </div>
        </div>
    )

  return (
    <Modal 
       disabled={isLoading}
       isOpen={loginModal.isOpen}
       title="Se connecter"
       actionLabel="Continuer"
       onClose={loginModal.onClose}
       onSubmit={handleSubmit(onSubmit)}
       body={bodyContent}
       footer={footerContent}
    />
  )
}

export default LoginModal