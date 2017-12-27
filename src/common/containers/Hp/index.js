import { connect } from 'react-redux';
import * as React from 'react';
import PropTypes from 'prop-types';

import { actions } from '@/state/hp';

// Components
import DisplacementObj from '@/components/DisplacementObj';

// Assets
import giulio from '@/assets/images/giulio.jpg';
import giulioMap from '@/assets/images/giulio-map.jpg';

@connect(state => ({ hp: state.hp }))
class Hp extends React.Component {
    static fetchData({ dispatch }) {
        return dispatch(actions.fetchHp());
    }

    componentWillMount() {
        if (Object.keys(this.props.hp).length === 0) {
            this.constructor.fetchData({ dispatch: this.props.dispatch });
        }
    }

    render() {
        return (
            <DisplacementObj
                image={giulio}
                map={giulioMap}
            />
        );
    }

};

Hp.propTypes = {
    hp: PropTypes.object
};

export default Hp;
