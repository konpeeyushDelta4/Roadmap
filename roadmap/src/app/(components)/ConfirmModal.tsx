import { Modal, ModalContent } from '@nextui-org/react';
import { Divider } from '@nextui-org/react';
import React from 'react'
import { Button } from '@nextui-org/react';

export default function ConfirmModal({ isOpen, onClose, onConfirm, title, loading=false }: {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    loading?: boolean;
}) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} className='' size="md">
            <ModalContent className="h-auto p-4">
                <div>{title}</div>
                <Divider className='my-3 mb-10' />
                <div className='flex justify-end gap-3'>
                    <Button onPress={onConfirm} color='danger' variant='flat' isLoading={loading}>Confirm</Button>
                    <Button onPress={onClose} variant='flat'>Cancel</Button>
                </div>
            </ModalContent>
        </Modal>
    )
}
