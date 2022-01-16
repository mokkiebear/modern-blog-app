import React, { useRef, useState, useEffect } from "react";

import { submitComment } from "../../services";

const CommentsForm = ({ slug }: any) => {
  const [error, setError] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const commentEl = useRef<HTMLTextAreaElement>(null);
  const nameEl = useRef<HTMLInputElement>(null);
  const emailEl = useRef<HTMLInputElement>(null);
  const storeDataEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (nameEl.current) {
      nameEl.current.value = localStorage.getItem("name") || "";
    }
    if (emailEl.current) {
      emailEl.current.value = localStorage.getItem("email") || "";
    }
  }, []);

  const handleSubmitBtnClick = () => {
    setError(false);

    if (
      !commentEl.current?.value ||
      !nameEl.current?.value ||
      !emailEl.current?.value
    ) {
      setError(true);
      return;
    }

    const commentObj = {
      name: nameEl.current?.value,
      email: emailEl.current?.value,
      comment: commentEl.current?.value,
      slug,
    };

    if (storeDataEl.current?.checked) {
      localStorage.setItem("name", commentObj.name);
      localStorage.setItem("email", commentObj.email);
    } else {
      localStorage.removeItem("name");
      localStorage.removeItem("email");
    }

    submitComment(commentObj).then((res) => {
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 5000);
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        Оставить комментарий
      </h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea
          ref={commentEl}
          className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          placeholder="Оставить комментарий..."
          name="comment"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          ref={nameEl}
          placeholder="Ваше имя"
          name="name"
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
        />

        <input
          type="text"
          ref={emailEl}
          placeholder="Электронный адрес"
          name="email"
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <input
            ref={storeDataEl}
            type="checkbox"
            id="storeData"
            name="storeData"
            value="true"
          />
          <label
            className="text-gray-500 cursor-pointer ml-2"
            htmlFor="storeData"
          >
            Сохранить мое имя и email в этом браузере.
          </label>
        </div>
      </div>
      {error && (
        <p className="text-xs text-red-500">
          Необходимо заполнить все поля, для того, чтобы оставить комментарий.
        </p>
      )}
      <div className="mt-8">
        <button
          type="button"
          onClick={handleSubmitBtnClick}
          className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full text-white px-8 py-3"
        >
          Опубликовать
        </button>
        {showSuccessMessage && (
          <span className="text-xl float-right font-semibold mt-3 text-green-500">
            Комментарий отправлен на проверку.
          </span>
        )}
      </div>
    </div>
  );
};

export default CommentsForm;
