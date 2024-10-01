/* eslint-disable no-console */
/* eslint-disable no-undef */
import React from "react";
import { Button } from "components/Button";
import Script from "next/script";
import { useCreateCashFreeOrderMutation } from "services/payment";
import { load } from "@cashfreepayments/cashfree-js";
import { useRouter } from "next/navigation";
import styles from "./BillingButton.module.scss";

export default function BillingButton({
    label = "Pay Now",
    orderCreatePayload,
    buttonClassName = styles.btn,
    buttonVariant = "primary",
    onClickPay = () => {},
    buttonProps = null,
    asyncActionBeforePayment = null,
    redirectTo = null,
}) {
    const [createOrder] = useCreateCashFreeOrderMutation();
    const { push } = useRouter();
    const makePayment = async () => {
        const { data, ...error } = await createOrder({
            payload: orderCreatePayload,
        });
        if (error?.error?.data?.message === "Already payment done.") {
            push(redirectTo ?? "/");
        }
        const paymentSessionId = data?.data?.data?.payment_session_id;
        const orderId = data?.data?.data?.order_id;
        const origin = redirectTo ?? window?.location?.href;
        const returnUrl = `${origin}${
            origin?.indexOf("?") > 0 ? "&" : "?"
        }cashfree_order_id=${orderId}`;
        if (
            !(
                data?.status === 200 &&
                data?.data?.status !== "error" &&
                paymentSessionId?.length > 0
            )
        ) {
            console.error("Failed to create order", error);
            return;
        }
        const cashfree = await load({
            mode:
                process?.env?.NEXT_PUBLIC_ENV?.toLowerCase() === "production"
                    ? "production"
                    : "sandbox",
        });
        const checkoutOptions = {
            paymentSessionId,
            returnUrl,
        };
        cashfree?.checkout(checkoutOptions)?.then((result) => {
            if (result?.error) {
                console.error("Redirection Failed", result?.error?.message);
            }
            if (result.redirect) {
                console.log("Redirection");
            }
        });
    };
    return (
        <>
            <Script
                id="razorpay-checkout-js"
                src="https://checkout.razorpay.com/v1/checkout.js"
            />
            <Button
                className={buttonClassName}
                variant={buttonVariant}
                {...(buttonProps && buttonProps)}
                onClick={async (e) => {
                    e?.stopPropagation();
                    e?.preventDefault();
                    onClickPay();
                    if (asyncActionBeforePayment) {
                        const res = await asyncActionBeforePayment();
                        if (!res) return;
                    }
                    makePayment();
                }}
            >
                {label}
            </Button>
        </>
    );
}
