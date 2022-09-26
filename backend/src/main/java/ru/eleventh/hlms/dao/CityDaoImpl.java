package ru.eleventh.hlms.dao;

import lombok.RequiredArgsConstructor;
import lombok.val;
import org.hibernate.SessionFactory;
import org.springframework.stereotype.Component;
import ru.eleventh.hlms.entity.City;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import java.util.List;

@Component
@RequiredArgsConstructor
public class CityDaoImpl implements CityDao {

    private final SessionFactory sessionFactory;

    public List<City> findCityByNameICase(String name) {
        val session = sessionFactory.openSession();
        val criteriaBuilder = session.getCriteriaBuilder();
        val criteriaQuery = criteriaBuilder.createQuery(City.class);
        val root = criteriaQuery.from(City.class);
        val criteria = criteriaQuery.select(root)
                .where(criteriaBuilder.equal(criteriaBuilder.lower(root.get("name")), name.toLowerCase()));

        val query = session.createQuery(criteria);
        val result = query.getResultList();
        session.close();
        return result;
    }

    public List<City> findAll(Integer page, Integer pageSize) {
        val session = sessionFactory.openSession();
        val query = session.createQuery("FROM City");
        query.setFirstResult(page * pageSize);
        query.setMaxResults(pageSize);
        val result = query.getResultList();
        session.close();
        return result;
    }

    public void update(City city) {
        val session = sessionFactory.openSession();
        val transaction = session.getTransaction();

        transaction.begin();
        val detachedCity = session.get(City.class, city.getId());
        detachedCity.setName(city.getName());
        detachedCity.setPhoto(city.getPhoto());
        transaction.commit();
        session.close();
    }

    public void saveAll(List<City> list) {
        val session = sessionFactory.openSession();
        val transaction = session.getTransaction();

        transaction.begin();
        list.forEach(session::persist);
        transaction.commit();
        session.close();
    }

    public void deleteAll() {
        val session = sessionFactory.openSession();
        val criteriaBuilder = session.getCriteriaBuilder();
        val criteriaDelete = criteriaBuilder.createCriteriaDelete(City.class);
        val root = criteriaDelete.from(City.class);

        val transaction = session.getTransaction();
        transaction.begin();
        session.createQuery(criteriaDelete).executeUpdate();
        transaction.commit();
        session.close();
    }

    public Long count() {
        val session = sessionFactory.openSession();
        val сriteriaBuilder = session.getCriteriaBuilder();
        val criteriaQuery = сriteriaBuilder.createQuery(Long.class);
        val root = criteriaQuery.from(City.class);
        criteriaQuery.select(сriteriaBuilder.count(root));

        val result = session.createQuery(criteriaQuery).getSingleResult();
        session.close();
        return result;
    }
}
