import RestrictedAccessPage from '@/app/restricted-access/page'
import FeatureGuard from '@/components/featureGuard'
import React from 'react'

export default function InvestmentPortfolio() {
    return (
        <FeatureGuard requiredFeature={'pro'}>
            <div>page</div>
        </FeatureGuard>

    )
}
