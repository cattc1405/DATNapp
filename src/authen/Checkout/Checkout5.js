import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {getPaymentInfo, sendTransactions} from '../../apiClient';
import {useRoute} from '@react-navigation/native';
// const data = {
//   orderCode: 'ORD-001',
//   amount: 1000000,
//   transactions: [
//     {
//       accountNumber: '1234567890',
//       reference: 'ABC-12345',
//       description: 'Payment for order 12345',
//       transactionDateTime: '2022-01-01 10:00:00',
//     },
//   ],
// };
const Checkout5 = ({navigation}) => {
  const transactionId = useSelector(state => state.cart.transactionId);
  const [data, setData] = useState();
  const token = useSelector(state => state.auth.user?.token);
  
  const route = useRoute();

  console.log('Payment Data:', JSON.stringify(data, null, 2));
  console.log('Payment id:', transactionId);
  // useEffect(async () => {
  //   const response = await getPaymentInfo(transactionId, token);
  //   setData(response);
  // }, [transactionId, token]);
  useEffect(() => {
    const fetchPaymentInfo = async () => {
      try {
        const response = await getPaymentInfo(transactionId, token);
        setData(response);
      } catch (error) {
        console.error(error);
      }
    };
  
    if (transactionId && token) {
      fetchPaymentInfo();
    }
  }, [transactionId, token]);
  // useEffect(() => {
  //   const processTransaction = async () => {
  //     if (paymentData?.transactions?.length > 0) {
  //       const transactionData = {
  //         orderId: orderId,
  //         accountNumber: paymentData.transactions[0]?.accountNumber || '',
  //         amount: paymentData.amount || 0,
  //         counterAccountBankId:
  //           paymentData.transactions[0]?.counterAccountBankId || '',
  //         counterAccountBankName:
  //           paymentData.transactions[0]?.counterAccountBankName || '',
  //         counterAccountName:
  //           paymentData.transactions[0]?.counterAccountName || '',
  //         counterAccountNumber:
  //           paymentData.transactions[0]?.counterAccountNumber || '',
  //         description: paymentData.transactions[0]?.description || '',
  //         reference: paymentData.transactions[0]?.reference || '',
  //         transactionDateTime:
  //           paymentData.transactions[0]?.transactionDateTime || '',
  //         virtualAccountName:
  //           paymentData.transactions[0]?.virtualAccountName || '',
  //         virtualAccountNumber:
  //           paymentData.transactions[0]?.virtualAccountNumber || '',
  //       };

  //       try {
  //         // Assuming sendTransactions is a function you import
  //         await sendTransactions(token, transactionData);
  //         console.log('Transaction sent successfully.');
  //       } catch (error) {
  //         console.error('Error sending transaction:', error);
  //       }
  //     } else {
  //       console.error('No transactions found in paymentData');
  //     }
  //   };

  //   // Call the transaction processing function when the component loads
  //   processTransaction();
  // }, [orderId, paymentData, token]);
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.illustrationContainer}>
      <Text style={styles.questionText}>
        Đơn hàng của bạn đang được chuẩn bị.
      </Text>
      <Text style={styles.subText}>
        Hãy đến cửa hàng ngay để nhận hàng nhé!
      </Text>
        <Image
          source={require('../../../assets/images/backroundcheckout5.png')}
          style={styles.illustrationImage}
          resizeMode="contain"
        />
      </View>
      {/* Payment Information Container */}
      {data && (
        <View style={styles.paymentInfoContainer}>
          <Text style={styles.paymentInfoTitle}>Payment Information</Text>
          <Text style={styles.transactionText}>
            Order Code: {data.orderCode}
          </Text>
          <Text style={styles.transactionText}>Amount: {data.amount} VND</Text>
{/* 
          {data.transactions && data.transactions.length > 0 && (
            <View>
              <Text style={styles.paymentInfoSubTitle}>
                Transaction Details:
              </Text>
              {data.transactions.map((transaction, index) => (
                <View key={index} style={styles.transactionItem}>
                  <Text style={styles.transactionText}>
                    Account Number: {transaction.accountNumber}
                  </Text>
                  <Text style={styles.transactionText}>
                    Transaction Reference: {transaction.reference}
                  </Text>
                  <Text style={styles.transactionText}>
                    Description: {transaction.description}
                  </Text>
                  <Text style={styles.transactionText}>
                    Transaction Date: {transaction.transactionDateTime}
                  </Text>
                </View>
              ))}
            </View>
          )} */}
        </View>
      )}

      {/* Illustration */}

      {/* Finish Button */}
      <TouchableOpacity
        style={styles.finishButton}
        onPress={() => navigation.navigate('HomeStack', {
          screen: 'Home',
         
        })}>
        <Text style={styles.finishButtonText}>Back to home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Checkout5;

const styles = StyleSheet.create({
  questionText: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    fontFamily: 'nunitoSan',
    color: '#000000',
  },
  subText: {
    width:'80%',
    fontSize: 15,
    color: '#989DA3',
    textAlign: 'center',
    marginVertical: 20,
    fontWeight: '600',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center ',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  stepText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#888',
    marginLeft: '40%',
    fontFamily: 'nunitoSan',
  },
  closeButton: {
    padding: 10,
  },
  closeText: {
    fontSize: 28,
    color: '#000',
    fontFamily: 'nunitoSan',
  },
  paymentInfoContainer: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    elevation:5,
    borderRadius: 10,
    marginBottom: 20,
  },
  paymentInfoTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    fontFamily: 'nunitoSan',
  },
  paymentInfoText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
    fontFamily: 'nunitoSan',
  },
  paymentInfoSubTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 5,
    fontFamily: 'nunitoSan',
  },
  transactionItem: {
    marginBottom: 10,
  },
  transactionText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
    fontFamily: 'nunitoSan',
  },
  illustrationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationImage: {
    width: 300,
    height: 300,
    position: 'relative',
    marginBottom: 30,
  },
  finishButton: {
    backgroundColor: '#FF5733',

    borderRadius: 10,

    position: 'absolute',
    width: '90%',
    bottom: 20,
    alignItems: 'center',
    justifyContent: 'center',

    height: 60,
  },
  finishButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
