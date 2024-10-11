// source: https://github.com/gluestack/gluestack-ui/blob/main/packages/unstyled/form-control/src/useFormControl.tsx

export const useFormControl = (props: any) => {
  const describedBy: any[] = []

  const ariaDescribedBy = describedBy.join(' ')

  const { isInvalid, isDisabled, isReadOnly, isRequired, ...cleanProps } = props

  let id = props?.id

  return {
    ...cleanProps,
    id,
    'disabled': isDisabled,
    'readOnly': isReadOnly,
    'required': isRequired,
    'aria-invalid': isInvalid,
    'aria-required': isRequired,
    'aria-readonly': isReadOnly,
    'aria-describedby': ariaDescribedBy || undefined,
  }
}
