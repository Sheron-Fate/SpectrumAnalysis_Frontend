import { FC, useState, useEffect } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { BreadCrumbs } from "../components/common/BreadCrumbs/BreadCrumbs";
import { ROUTE_LABELS } from "../Routes";
import PigmentCard from "../components/pigments/PigmentCard/PigmentCard";
import PigmentFilters from "../components/pigments/PigmentFilters/PigmentFilters";
import { CartBadge } from "../components/common/CartBadge/CartBadge";
import { getPigments } from "../services/pigmentsApi";
import type { Pigment } from "../types/pigment";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../Routes";
import "./PigmentsPage.css";

const PigmentsPage: FC = () => {
  const [search, setSearch] = useState('')
  const [color, setColor] = useState('')
  const [loading, setLoading] = useState(false)
  const [pigments, setPigments] = useState<Pigment[]>([])

  const navigate = useNavigate()

  const fetchPigments = async () => {
    setLoading(true)
    const { pigments } = await getPigments(search, color)
    setPigments(pigments)
    setLoading(false)
  }

  useEffect(() => {
    fetchPigments()
  }, []) // Загружаем пигменты при монтировании компонента

  const handleSearch = () => {
    fetchPigments()
  }

  const handleCardClick = (id: number) => {
    navigate(`${ROUTES.PIGMENTS}/${id}`)
  }

  return (
    <div className="container">
      <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.PIGMENTS }]} />

      <PigmentFilters
        search={search}
        setSearch={setSearch}
        color={color}
        setColor={setColor}
        onSearch={handleSearch}
        loading={loading}
      />

      {loading && (
        <div className="loadingBg">
          <Spinner animation="border" />
        </div>
      )}

      {!loading && !pigments.length ? (
        <div>
          <h1>К сожалению, пигменты не найдены :(</h1>
        </div>
      ) : (
        <>
          <Row xs={1} md={2} lg={3} className="g-4">
            {pigments.map((pigment) => (
              <Col key={pigment.id}>
                <PigmentCard
                  onCardClick={handleCardClick}
                  {...pigment}
                />
              </Col>
            ))}
          </Row>
          <CartBadge />
        </>
      )}
    </div>
  );
};

export default PigmentsPage;
