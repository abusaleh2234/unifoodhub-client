import React from "react";
import Modal from 'react-modal';

const customStyles = {
    content: {
        width: "500px",
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: "white"
    },
};

const EditReview = ({ user, reviow, hendelreviewEdit }) => {

    console.log(reviow);
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }
    return (
        <div>
            <button onClick={openModal} className="btn text-lg font-semibold border transition duration-300 bg-white border-[#f01543] hover:bg-[#f01543] hover:text-white text-[#f01543]"><span className="">Edit</span></button>
            {/* <button >Open Modal</button> */}
            <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Review </h2>
                <button onClick={closeModal} className="btn-circle btn">X</button>
            </div>
            <form className="space-y-4">
                <div className="">
                    <label className='text-sm mb-2'>
                        Meal Name
                    </label>
                    <input type='text' defaultValue={reviow?.name} name='name' placeholder='meal name' className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                        required />
                </div>
                <div className="">
                    <label className='text-sm mb-2'>
                        User email
                    </label>
                    <input type='text' defaultValue={user?.email} name='email' required placeholder='email' className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                    />
                </div>
                <div className="">
                    <label className='text-sm mb-2'>
                        Details
                    </label>
                    <textarea defaultValue={reviow?.reviews_details} name="details" className="w-full textarea textarea-bordered h-24" placeholder="details" required />
                </div>
                <button onClick={() => hendelreviewEdit(reviow)} className="btn w-full  text-lg font-semibold border transition duration-300 bg-white border-[#f01543] hover:bg-[#f01543] hover:text-white text-[#f01543]">Review</button>
            </form>
        </Modal>
        </div>

    );
};

export default EditReview;