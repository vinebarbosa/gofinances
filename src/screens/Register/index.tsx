import React, { useState } from 'react'
import { 
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native'

import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { Container, Header, Title, Form, Fields, TransactionsType } from './styles'

import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton'
import { CategorySelectButton } from '../../components/Form/CategorySelectButton'
import { CategorySelect } from '../CategorySelect'
import { InputForm } from '../../components/Form/InputForm'
import { Button } from '../../components/Form/Button'

interface FormData {
  name: string;
  amount: string;
}

const schema = Yup.object().shape({
  name: Yup
    .string()
    .required('O valor é obrigatório!'),
  amount: Yup
    .number()
    .typeError('Informe um valor numérico!')
    .positive('O valor deve ser positivo!')
    .required('O valor é obrigatório!')

})

export function Register() {
  const [ transactionType, setTransactionType ] = useState('')
  const [ modalOpen, setModalOpen ] = useState(false)
  const [ category, setCategory ] = useState({ key: 'category', name: 'Categoria' })

  const { control, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema)})

  function handleTransactionTypeSelect(type: 'up' | 'down') {
    setTransactionType(type)
  }

  function handleCloseModal() {
    setModalOpen(false)
  }
  
  function handleOpenModal() {
    setModalOpen(true)
  }

  function handleRegister(form:FormData) {
    if(!transactionType) return Alert.alert('Selecione o typo da transação!')
    if(category.key === 'category') return Alert.alert('Selecione a categoria!')

    const data = {
      name: form.name,
      amount: form.amount,
      transactionType: transactionType,
      category: category.name
    }
    console.log(data);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>
        <Form>
          <Fields>
            <InputForm 
              control={control}
              name='name'
              placeholder='Nome'
              autoCapitalize='sentences'
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm
              control={control}
              name='amount'
              placeholder='Preço'
              keyboardType='numeric'
              error={errors.amount && errors.amount.message}
            />

            <TransactionsType>
              <TransactionTypeButton
                title="entrada"
                type="up"
                onPress={() => handleTransactionTypeSelect("up")}
                isActive={transactionType === "up"}

              />

              <TransactionTypeButton
                title="saída"
                type="down"
                onPress={() => handleTransactionTypeSelect("down")}
                isActive={transactionType === "down"}
              />
            </TransactionsType>

            <CategorySelectButton title={category.name} onPress={handleOpenModal}/>
          </Fields>
          <Button title='Enviar' onPress={handleSubmit(handleRegister)} />
        </Form>

        <Modal visible={modalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  )
}
