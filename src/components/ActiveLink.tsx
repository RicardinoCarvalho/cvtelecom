import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { cloneElement, ReactElement } from "react";

interface ActiveLinkProps  extends LinkProps{
    children: ReactElement,
    shouldMatchExtactHref?: boolean;
}

export function ActiveLink({ children, shouldMatchExtactHref, ...rest }: ActiveLinkProps) {
    const { asPath } = useRouter()

    let isActive = false;

    if(shouldMatchExtactHref && (asPath === rest.href || asPath === rest.as)) {
        isActive = true;
    }

    if (!shouldMatchExtactHref && (asPath.startsWith(String(rest.href))) || (asPath.startsWith(String(rest.as)))) {
        isActive = true;
    }

    return (
        <Link {...rest}>
            {cloneElement(children, {
                color: isActive ? 'blue.300' : 'gray.50'
            })}
        </Link>
    );

}