import styled from '@emotion/styled';

import { ReactComponent as EditNicknameSVG } from 'icons/edit_nickname.svg';
import { ReactComponent as SignoutSVG } from 'icons/signout.svg';
import { ReactComponent as WithdrawalSVG } from 'icons/withdrawal.svg';

export const MyPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  width: 100%;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex: 0.8;
  width: 100%;
  padding: 0 0 3rem 0;
`;

export const CenterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.3rem;

  p {
    color: ${(props) => props.theme.colors.grey600};
    font-weight: 600;
  }
`;

export const MyPageTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    display: flex;
    flex-direction: row;
    gap: 0.3rem;

    p.nickname {
      color: ${(props) => props.theme.colors.primary};
    }
  }

  p {
    font-size: ${(props) => props.theme.font.size.xl};
    font-weight: 900;
  }
`;

export const EditNickname = styled(EditNicknameSVG)`
  width: 1rem;
  height: 1rem;
`;

export const Signout = styled(SignoutSVG)`
  width: 1rem;
  height: 1rem;
`;

export const Withdrawal = styled(WithdrawalSVG)`
  width: 1rem;
  height: 1rem;
`;
