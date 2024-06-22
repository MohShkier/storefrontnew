"use client"

import React, { useEffect, useState } from "react"
import { PencilSquare as Edit, Trash } from "@medusajs/icons"
import { Button, Heading, Text, clx } from "@medusajs/ui"
import { Address, Region } from "@medusajs/medusa"

import useToggleState from "@lib/hooks/use-toggle-state"
import CountrySelect from "@modules/checkout/components/country-select"
import Input from "@modules/common/components/input"
import Modal from "@modules/common/components/modal"
import {
  deleteCustomerShippingAddress,
  updateCustomerShippingAddress,
} from "@modules/account/actions"
import Spinner from "@modules/common/icons/spinner"
import { useFormState } from "react-dom"
import { SubmitButton } from "@modules/checkout/components/submit-button"

type EditAddressProps = {
  region: Region
  address: Address
  isActive?: boolean
}

const EditAddress: React.FC<EditAddressProps> = ({
  region,
  address,
  isActive = false,
}) => {
  const [removing, setRemoving] = useState(false)
  const [successState, setSuccessState] = useState(false)
  const { state, open, close: closeModal } = useToggleState(false)

  const [formState, formAction] = useFormState(updateCustomerShippingAddress, {
    success: false,
    error: null,
    addressId: address.id,
  })

  const close = () => {
    setSuccessState(false)
    closeModal()
  }

  useEffect(() => {
    if (successState) {
      close()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successState])

  useEffect(() => {
    if (formState.success) {
      setSuccessState(true)
    }
  }, [formState])

  const removeAddress = async () => {
    setRemoving(true)
    await deleteCustomerShippingAddress(address.id)
    setRemoving(false)
  }

  return (
    <>
      <div
        className={clx(
          "border rounded-rounded p-5 min-h-[220px] h-full w-full flex flex-col justify-between transition-colors test",
          {
            "border-gray-900 test": isActive,
          }
        )}
      >
        <div className="flex flex-col test" data-testid="address-container">
          <Heading className="text-left text-base-semi" data-testid="address-name">
            {address.first_name} {address.last_name}
          </Heading>
          {address.company && (
            <Text className="txt-compact-small text-ui-fg-base" data-testid="address-company">
              {address.company}
            </Text>
          )}
          <Text className="flex flex-col text-left text-base-regular mt-2">
            <span data-testid="address-address">
              {address.address_1}
              {address.address_2 && <span>, {address.address_2}</span>}
            </span>
            <span data-testid="address-postal-city">
              {address.postal_code}, {address.city}
            </span>
            <span data-testid="address-province-country">
              {address.province && `${address.province}, `}
              {address.country_code?.toUpperCase()}
            </span>
          </Text>
        </div>
        <div className="flex items-center gap-x-4 test">
          <button
            className="text-small-regular text-ui-fg-base flex items-center gap-x-2 test"
            onClick={open}
            data-testid="address-edit-button"
          >
            <Edit />
            تعديل
          </button>
          <button
            className="text-small-regular text-ui-fg-base flex items-center gap-x-2"
            onClick={removeAddress}
            data-testid="address-delete-button"
          >
            {removing ? <Spinner /> : <Trash />}
            حذف
          </button>
        </div>
      </div>

      <Modal isOpen={state} close={close}>
        <Modal.Title>
          <Heading className="mb-2 ">تعديل العنوان</Heading>
        </Modal.Title>
        <form action={formAction}>
          <Modal.Body>
            <div className="grid grid-cols-1 gap-y-2 test">
              <div className="grid grid-cols-2 gap-x-2 test">
                <Input
                  label="الاسم الأول"
                  name="first_name"
                  required
                  autoComplete="given-name"
                  defaultValue={address.first_name || undefined}
                />
                <Input
                  label="الاسم الأخير"
                  name="last_name"
                  required
                  autoComplete="family-name"
                  defaultValue={address.last_name || undefined}
                />
              </div>
              <Input
                label="Company"
                className="hidden"
                name="company"
                autoComplete="organization"
                defaultValue={address.company || undefined}
              />
              <Input
                label="العنوان"
                name="address_1"
                required
                autoComplete="address-line1"
                defaultValue={address.address_1 || undefined}
              />
              <Input
                label="Apartment, suite, etc."
                className="hidden"
                name="address_2"
                autoComplete="address-line2"
                defaultValue={address.address_2 || undefined}
              />
              <div className="grid  gap-x-2 test">
                <Input
                  label="Postal code"
                  className="hidden"
                  name="postal_code"
                  
                  autoComplete="postal-code"
                  defaultValue={address.postal_code || undefined}
                />
                <Input
                  label="المدينة"
                  name="city"
                  required
                  autoComplete="locality"
                  defaultValue={address.city || undefined}
                />
              </div>
              <Input
              className="hidden"
                label="Province / State"
                name="province"
                autoComplete="address-level1"
                defaultValue={address.province || undefined}
              />
              <CountrySelect
                name="country_code"
                region={region}
                required
                autoComplete="country"
                defaultValue={address.country_code || undefined}
              />
              <Input
                label="رقم الهاتف"
                required
                name="phone"
                autoComplete="phone"
                defaultValue={address.phone || undefined}
              />
            </div>
            {formState.error && (
              <div className="text-rose-500 text-small-regular py-2">
                {formState.error}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <div className="flex gap-3 mt-6 justify-center">
              <Button
                type="reset"
                variant="secondary"
                onClick={close}
                className="h-10"
              >
                الغاء
              </Button>
              <SubmitButton>حفظ</SubmitButton>
            </div>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}

export default EditAddress
