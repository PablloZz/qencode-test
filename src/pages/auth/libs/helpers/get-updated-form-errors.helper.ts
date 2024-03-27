function getUpdatedFormErrors<T extends Record<string, string>>(
  oldErrorFields: T,
  errorFieldsToUpdate: T[]
) {
  const errors = errorFieldsToUpdate.reduce((fields, field) => {
    return { ...fields, ...field };
  }, {});

  return { ...oldErrorFields, ...errors } as T;
}

export { getUpdatedFormErrors };
