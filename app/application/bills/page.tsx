import FeatureGuard from '@/components/featureGuard'
import React from 'react'

export default function BillsPage() {
    return (
        <FeatureGuard requiredFeature={'pro'}>
            <div>page</div>
        </FeatureGuard>
    )
}
