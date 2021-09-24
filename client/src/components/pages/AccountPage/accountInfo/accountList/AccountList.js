import React from 'react';
import AccountCard from '../accountCards/AccountCard';
import PropTypes from 'prop-types';
import { percIncrease } from '../../utils';

const calculatePreviousDayBalance = (account, previousAccounts) => {
  let wantedProperty = previousAccounts.find(
    (obj) => obj.accountId === account.accountId,
  );
  console.log(wantedProperty);
  return percIncrease(
    wantedProperty.balanceList[0].openingAvailableAmount,
    account.balanceList[0].openingAvailableAmount,
  );
};
const AccountList = ({ data, previous }) => {
  // TODO what if we have lots of accounts? paginate?
  console.log(previous);
  return (
    <div>
      {data &&
        data.map((account, key) => (
          <AccountCard
            key={key}
            account={account}
            percentChange={calculatePreviousDayBalance(account, previous)}
          />
        ))}
    </div>
  );
};

AccountList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  previous: PropTypes.arrayOf(PropTypes.object),
};

export default AccountList;
