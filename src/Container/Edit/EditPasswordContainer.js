import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import EditPassword from '../../Component/Edit/EditPassword';
import useToast from '../../Hooks/useToast';
import { firebaseAuth } from '../../services/firebase';

const EditPasswordContainer = () => {
  const { displayName, photoURL } = useSelector(
    state => state.user.currentUser,
  );
  const [input, setInput] = useState({
    newPassword: '',
    checkNewPassword: '',
    error: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [toast] = useToast();

  const isChange = () => {
    const { newPassword, checkNewPassword } = input;
    return (
      newPassword !== '' &&
      checkNewPassword !== '' &&
      newPassword.length >= 6 &&
      checkNewPassword.length >= 6
    );
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const getASecureRandomPassword = ({ target }) => {
    setInput({
      ...input,
      [target.name]: target.value,
    });
  };

  const preventSubmit = e => e.preventDefault();
  const sleep = n => new Promise(resolve => setTimeout(resolve, n));
  const onEditPasswordSubmit = async e => {
    e.preventDefault();
    if (input.newPassword !== input.checkNewPassword) {
      setInput({
        ...input,
        error: '두 비밀번호가 일치하는지 확인하세요.',
      });
      console.log('두 비밀번호가 일치하는지 확인하세요.');
    } else {
      setIsLoading(true);
      await sleep(2000);
      try {
        const user = firebaseAuth.currentUser;
        const newPassword = input.newPassword;
        user.updatePassword(newPassword);
        setInput({ newPassword: '', checkNewPassword: '', error: null });
        toast('비밀번호가 변경되었습니다.');
        setIsLoading(false);
      } catch (error) {
        setInput({ ...input, error });
      }
    }
  };

  const inputList = [
    {
      id: 'newPassword',
      text: '새 비밀번호',
      placeholder: '최소 6자리 이상으로 비밀번호를 작성하세요.',
      value: `${input.newPassword}`,
    },
    {
      id: 'checkNewPassword',
      text: '새 비밀번호 확인',
      placeholder: '새 비밀번호와 일치하도록 작성하세요.',
      value: `${input.checkNewPassword}`,
    },
  ];

  useEffect(() => {
    document.title = '비밀번호 변경 • Instagram';
  }, []);

  return (
    <EditPassword
      isChange={isChange()}
      inputList={inputList}
      displayName={displayName}
      photoURL={photoURL}
      handleKeyPress={handleKeyPress}
      getASecureRandomPassword={getASecureRandomPassword}
      preventSubmit={preventSubmit}
      onEditPasswordSubmit={onEditPasswordSubmit}
      isLoading={isLoading}
      error={input.error}
    />
  );
};

export default EditPasswordContainer;
