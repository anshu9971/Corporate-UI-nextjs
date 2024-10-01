"use client";

import { Provider, useDispatch, useSelector } from "react-redux";
import { PERSISTOR, STORE } from "redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { UTM_PARAMS } from "utils/constants";
import { setUtmParams } from "redux/store/authSlice";
import { isEmpty } from "lodash";
import { useUpdateCashFreePaymentMutation } from "services/payment";
import { removeParamFromUrl } from "utils/helpers";
import { Loader } from "components/Loader";

function SetupUtmParams() {
    const searchParams = useSearchParams();
    const dispatch = useDispatch();
    const [updateCashfreePayment] = useUpdateCashFreePaymentMutation();
    const auth = useSelector((state) => state.auth);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        const utmParams = UTM_PARAMS.map((param) => ({
            key: param,
            value: searchParams?.get(param),
        }))
            .filter(({ value }) => !!value)
            .reduce(
                (acc, curr) => ({
                    ...acc,
                    [curr.key === "paywall" ? "is_paywall_enabled" : curr.key]:
                        curr.key === "paywall"
                            ? `${curr.value
                                  .substring(0, 1)
                                  .toUpperCase()}${curr.value.substring(1)}`
                            : curr.value,
                }),
                {},
            );
        if (!isEmpty(utmParams)) {
            dispatch(setUtmParams(utmParams));
        }
    }, [dispatch, searchParams]);

    useEffect(() => {
        const orderId = searchParams.get("cashfree_order_id");
        const doAsync = async () => {
            await updateCashfreePayment({
                payload: {
                    customer_id: auth?.user?.id,
                    order_id: orderId,
                },
            });
            setIsLoading(false);
            window.location.reload();
        };
        if (orderId?.length > 0) {
            setIsLoading(true);
            doAsync();
            removeParamFromUrl("cashfree_order_id");
        }
    }, [searchParams]);
    return isLoading ? <Loader isLoading={isLoading} /> : null;
}
export default function ReduxProvider({ children }) {
    return (
        <Provider store={STORE}>
            <PersistGate loading={null} persistor={PERSISTOR}>
                {children}
                <SetupUtmParams />
            </PersistGate>
        </Provider>
    );
}
