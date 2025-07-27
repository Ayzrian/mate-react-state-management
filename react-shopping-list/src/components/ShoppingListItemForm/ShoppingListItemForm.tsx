import { cva } from "class-variance-authority";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useState } from "react";

const schema = yup
  .object({
    name: yup.string().min(1).max(100).required(),
    quantity: yup.number().min(1).integer().required(),
    mustHave: yup.boolean().required()
  })
  .required()

export type ShoppingListItemFormValues = yup.InferType<typeof schema>;

interface ShoppingListItemFormProps {
    defaultValues: ShoppingListItemFormValues
    onSubmit: (item: ShoppingListItemFormValues) => Promise<void>
 }
 

const input = cva(["input"], {
    variants: {
        error: {
            true: ["input-error"]
        }
    }
});

export function ShoppingListItemForm({ onSubmit, defaultValues }: ShoppingListItemFormProps) {
    const {
        register,
        handleSubmit: handleFormSubmit,
        formState: { errors, isSubmitting },
        reset
      } = useForm({
        resolver: yupResolver(schema),
        defaultValues
    })

    const [errorMessage, setErrorMessage] = useState('');
    const handleSubmit = async (values: ShoppingListItemFormValues) => {
        try {
            setErrorMessage('');
            await onSubmit({ ...values })

            reset()
        } catch(e) {
            setErrorMessage('Failed to create item. Try again later!');
        }
    }

    return (<div className="flex items-center justify-center gap-2">
        <div className="card bg-white shadow-sm w-[300px]">
            <div className="card-body">
                <h2 className="card-title">
                    Add New Item
                </h2>

                {
                    errorMessage && <div className="alert alert-error">{errorMessage}</div>
                }

                <form className="flex flex-col space-y-2" onSubmit={handleFormSubmit(handleSubmit)}>
                    <input disabled={isSubmitting} className={input({ error: !!errors.name })} {...register("name")} type="text" placeholder="Input an item name"/>
                    {
                        errors.name && <p className="text-red-500">{errors.name.message}</p>
                    }

                    <input disabled={isSubmitting} className={input({ error: !!errors.quantity  })} {...register("quantity")} type="number"/>
                    {
                        errors.quantity && <p className="text-red-500">{errors.quantity.message}</p>
                    }

                    <label className="label cursor-pointer space-x-1">
                        <span className="label-text">Must Have:</span>
                        <input disabled={isSubmitting} className="checkbox" {...register("mustHave")} type="checkbox"/>
                    </label>

                    <button disabled={isSubmitting} className="btn btn-primary" type="submit">
                        {
                            !isSubmitting && 'Submit'
                        }

                        {
                            isSubmitting && <span className="loading loading-spinner"/>
                        }
                    </button>
                </form>
            </div>
        </div>
    </div>)
}