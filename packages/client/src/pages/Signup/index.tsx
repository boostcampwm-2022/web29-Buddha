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
    if (isValidateNickname()) {
      if (signupType === 'owner') {
        if (isValidateCorporate()) {
          alert(`nickname: ${nickname} \ncorporate: ${corporate}`);
        } else {
          alert('사업자 등록 번호 입력이 잘못됐습니다.');
        }
      } else {
        alert(`nickname: ${nickname}`);
      }
    } else {
      alert('닉네임 입력이 잘못됐습니다.');
    }
  };

  const changeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value.replace(/[^ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|\s]/g, ''));
  };

  const changeCorporate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCorporate(e.target.value.replace(/[^0-9-]/g, ''));
  };

  const isValidateNickname = () => {
    return nickname.length > 2;
  };

  const isValidateCorporate = () => {
    return corporate.length >= 10;
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
          placeholder={'닉네임을 입력해주세요. 알파벳, 숫자만 사용'}
          maxLength={20}
          value={nickname}
        />
      </div>
      {signupType === 'owner' ? (
        <div>
          <p>사업자 등록 번호</p>
          <input
            onChange={changeCorporate}
            type={'text'}
            placeholder={'사업자 등록 번호를 입력해주세요.'}
            maxLength={12}
            value={corporate}
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
