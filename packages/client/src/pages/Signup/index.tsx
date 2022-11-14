import { useState } from 'react';

function Signup() {
  const [signupType, setSignupType] = useState<string>('customer');
  const [nickname, setNickname] = useState<string>('');
  const [corporate, setCorporate] = useState<string>('');

  const handleClickCustomer = () => {
    setSignupType('customer');
  };

  const handleClickOwner = () => {
    setSignupType('owner');
  };

  const handleSubmit = () => {
    alert(`nickname: ${nickname} \ncorporate: ${corporate}`);
  };

  const changeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const changeCorporate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCorporate(e.target.value);
  };

  return (
    <div>
      <div>
        <span onClick={handleClickCustomer}>고객</span>
        <span onClick={handleClickOwner}>업주</span>
      </div>
      <div>
        <p>닉네임</p>
        <input
          onChange={changeNickname}
          type={'text'}
          placeholder={'닉네임을 입력해주세요.'}
          maxLength={20}
        />
      </div>
      {signupType === 'owner' ? (
        <div>
          <p>사업자 등록 번호</p>
          <input
            onChange={changeCorporate}
            type={'text'}
            placeholder={'사업자 등록 번호를 입력해주세요.'}
            maxLength={20}
          />
        </div>
      ) : (
        <></>
      )}
      <button onClick={handleSubmit}>회원가입</button>
    </div>
  );
}

export default Signup;
