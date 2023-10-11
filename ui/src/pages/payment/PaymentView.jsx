import {useLocation} from 'react-router-dom';
import React from 'react';
import PaymentContainer from './PaymentContainer';

function useQuery() {
    const { search } = useLocation();
  
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

export const CreatedPaymentView = () => {
    const query = useQuery(); 

    return (<PaymentContainer id={query.get('id')} name={query.get('name')} price={query.get('price')} category={query.get('category')}></ PaymentContainer>)
}
