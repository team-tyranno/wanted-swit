import React, { useState } from 'react';
import { setUser } from 'redux/userSlice';
import { useAppDispatch } from 'hooks';
import ReactDOM from 'react-dom';
import { Logo } from 'assets';
import * as S from './style';

interface IModalProps {
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<EventTarget>) => void;
}

function BackDrop() {
  return <S.BackDrop />;
}

function Modal({ name, onChange, onSubmit }: IModalProps) {
  return (
    <S.Container onSubmit={onSubmit}>
      <Logo />
      <S.Text>닉네임을 입력해주세요!</S.Text>
      <S.Input
        spellCheck={false}
        placeholder="입력해주세요"
        onChange={onChange}
        value={name}
        required
      />
      <S.Button value={name}>채팅 시작</S.Button>
    </S.Container>
  );
}

export function RegisterModal({
  setIsEmpty,
}: {
  setIsEmpty: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const dispatch = useAppDispatch();
  const [name, setName] = useState<string>('');
  const backDropRoot: HTMLElement = document.getElementById('backdrop-root') as HTMLElement;
  const modalRoot: HTMLElement = document.getElementById('modal-root') as HTMLElement;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();

    if (name) {
      setIsEmpty(false);
      dispatch(setUser(name));
    }
  };

  return (
    <>
      {ReactDOM.createPortal(<BackDrop />, backDropRoot)}
      {ReactDOM.createPortal(
        <Modal name={name} onChange={onChange} onSubmit={onSubmit} />,
        modalRoot,
      )}
    </>
  );
}
